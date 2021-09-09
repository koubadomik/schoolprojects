import numpy as np #matrices
from sklearn.datasets import load_svmlight_file #loading data
from libsvm.svmutil import * #svm
import scipy.sparse as sparse #matrix comperession
import matplotlib.pyplot as plt
from math import sqrt, log

#references
#https://stackoverflow.com/questions/51127657/numpy-none
# -t 4 -c are training options

def train(K, labels, C):
    """
    Train SVM model (this method was provided with assignment)
    Parameters:
    K           Kernel matrix of samples
    labels      Labels vector for each sample
    C : float   C constant for svm training
    Returns:
    svm_model   svm model trained on provided data
    """
    K= sparse.hstack((1+np.arange(len(labels))[:,None], K)).A
    prob = svm_problem(labels, K, isKernel=True)
    param = svm_parameter('-t 4 -c ' + str(C))
    return svm_train(prob, param)


def evaluate(K, labels, model):
    """
    Evaluate SVM model (this method was provided with assignment)
    Parameters
    K                   Kernel matrix of samples
    labels              Labels vector for each sample
    model : svm_model   Model to be evaluated   
    Returns
    float               accuracy of provided model
    """
    K = sparse.hstack((1+np.arange(len(labels))[:,None], K)).A
    pred_labels, accuracy, _ = svm_predict(labels, K, model)
    return accuracy[0]


def train_and_validate(trnK, trnY, valK, valY, Cs):
    """
    Train and validate svm model on each value of parameter C
    Parameters
    trnK        Kernel matrix for training
    trnY        Labels vector for each sample from training set
    valK        Kernel matrix for validation
    valY        Labels vector for each sample from validation set
    Cs          Array of C parameter value to be evaluated
    Returns
    models      list of svm models
    trn_error   list of training errors for each value of C
    val_error   list of validation errors for each value of C
    sup_vect    list of numbers of support vetors for each value of C
    """
    models = []
    trn_error = []
    val_error = []
    sup_vect = []

    for C in Cs:
        #Training
        model = train(trnK, trnY, C)
        trn_error.append((100 - evaluate(trnK, trnY, model)) / 100)
        sup_vect.append(len(model.get_SV()))
        models.append(model)
        #Evaluate
        val_error.append((100 - evaluate(valK, valY, model)) / 100)
    return(models, trn_error, val_error, sup_vect)


def get_epsilon(a, b, l, gamma):
    """
    Count epsilon according to: ε = |b − a| * sqrt((log(2) − log(1 − γ)) / 2l)
    Find ε such that µ belongs to (µ − ε, µ + ε) with probability at least γ.
    Parameters
    a       Loss function lower bound
    b       Loss function upper bound
    l       Number of samples
    gamma   probability
    Returns
    epsilon deviation from real error
    """

    return abs(b-a) * sqrt((log(2) - log(1-gamma)) / (2*l))


# UTILS
def plot_errors(trn_error, val_error, Cs):
    x = np.log10(Cs) #log scale
    fig, ax = plt.subplots()
    ax.plot(x, trn_error, label="training error")
    ax.plot(x, val_error, label="validation error")
    ax.set_xlabel("log10(C)")
    ax.set_ylabel("error")
    #ax.set_title("Dependency of training/validation error on C")
    ax.legend()
    ax.set_xticks(x)
    plt.savefig("errors.png")

def save_table(mat):
    np.savetxt("errors.txt", mat, fmt='%.4f')


# RUN
def run():
    #Params and data
    trn_data_loc = "data/trn_kernel_mat.svmlight"
    tst_data_loc = "data/tst_kernel_mat.svmlight"
    val_data_loc = "data/val_kernel_mat.svmlight"
    [trnK,trnY] = load_svmlight_file(trn_data_loc)
    [tstK,tstY] = load_svmlight_file(tst_data_loc) 
    [valK,valY] = load_svmlight_file(val_data_loc)
    Cs = np.array([0.01, 0.1, 1, 10, 100])
    
    models, trn_error, val_error, sup_vect = train_and_validate(trnK, trnY, valK, valY, Cs)

    #plot and output
    plot_errors(trn_error, val_error, Cs)
    save_table(np.transpose(np.array([Cs, trn_error, val_error, sup_vect]))) 
    
    #choose best
    best_index = np.argmin(np.array(val_error))
    best_C = Cs[best_index]
    best_model = models[best_index]
    
    #evaluate test error
    test_error = ((100 - evaluate(tstK, tstY, best_model)) /100)
    epsilon = get_epsilon(0,1, tstK.shape[0], 0.99)
    
    #printing
    print("==========================")
    print("Best C:\t\t\t\t\t{}".format(best_C))
    print("Test error:\t\t\t\t{}".format(test_error))
    print("Epsilon:\t\t\t\t{}".format(epsilon))

run()    


    
