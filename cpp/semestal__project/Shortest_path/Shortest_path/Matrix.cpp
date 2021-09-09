#include  "headers.h"




Matrix::Matrix(int nRows, int nCols): rows(nRows), cols(nCols), data(new int[nCols*nRows])
{
	//std::cout << "Matrix construct" << std::endl;
	std::fill_n(data, nCols*nRows, INF);
}

Matrix::Matrix(int dimension) : rows(dimension), cols(dimension), data(new int[dimension*dimension])
{
	//std::cout << "Matrix construct" << std::endl;
	std::fill_n(data, dimension*dimension, INF);
}

Matrix::Matrix(const Matrix& m)
{
	this->data = new int[m.cols*m.rows];
	for (size_t i = 0; i < m.rows*m.cols; i++)
	{
		this->data[i] = m.data[i];
	}
	this->rows = m.rows;
	this->cols = m.cols;
}

Matrix::~Matrix()
{
	delete[] data;
}

int& Matrix::operator()(size_t i, size_t j)
{
	return data[i * cols + j];
}

int Matrix::operator()(size_t i, size_t j) const
{
	return data[i * cols + j];
}

size_t Matrix::get_nrows()
{
	return this->rows;
}

size_t Matrix::get_ncols()
{
	return this->cols;
}


std::ostream& operator<<(std::ostream& out, Matrix const& matrix)
{
	out << "-----------------------------" << std::endl;
	for (size_t i = 0; i < matrix.rows; i++)
	{
		for (size_t j = 0; j < matrix.cols; j++)
		{
			if(matrix(i, j)==INF)
				out << "INF" << "|";
			else
				out << matrix(i, j) << "|";
		}
		out << std::endl;
	}
	out << "-----------------------------" << std::endl;
	return  out;
}
