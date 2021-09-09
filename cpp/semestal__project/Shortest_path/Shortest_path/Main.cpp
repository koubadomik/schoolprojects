#include  "headers.h"
#include <chrono>



//adjcency list generator
void generateAdjacencyList(int vertexes)
{
	std::ofstream outfile("graph_"+std::to_string(vertexes)+".txt");

	int counter2 = 0;
	for (int i = 0; i < vertexes; i++)
	{
		for (int j = 0; j < vertexes; j++)
		{
			if (rand() % 75 < 70 && i != j)
			{
				outfile << i << " " << j << " " << rand() % 25;
				outfile << " ";
				counter2++;
			}
		}
	}
	outfile.close();
	std::cout << "original: " << vertexes*vertexes << " finally: " << counter2 << std::endl;
	std::cin.get();
}




void version() {
	std::cout << "All pairs Shortest path 1.0" << std::endl << std::endl
		<< "Developed and maintained by: " << std::endl
		<< "Dominik Kouba <koubadom@fel.cvut.cz>" << std::endl
		<< "Developed for the occasion of semestral"<<"project at CTU FEE - Software engineering and technology study program " << std::endl;
}

void help() {
	std::cout << "APSP is program for all pairs shortest path find in general graph without negative cycles"
		<< std::endl
		<< "Performed algorithm is Floyd-Warshall for all pairs shortest path"
		<< std::endl
		<< "Graph is respresented as adjacency list on input"
		<< std::endl
		<< std::endl
		<< "usage: [options] --file/--direct [input]"
		<< std::endl
		<< "find shortest path in graph described by file or direct standard input."
		<< std::endl
		<< std::endl
		<< "input: "
		<< "<number of vertexes><space><number of edges><space><integer id of source vertex><space>" 
		<< std::endl
		<< "<integer id of destination vertex><space><weight of current edge>....for all edges this triple"
		<< std::endl
		<< std::endl
		<< "  -m, --mthread" << "\t\t" << "multithreaded version of algorithm"
		<< std::endl
		<< "  -d, --direct [input]" << "\t"<<
		 "find shortest paths in graph described by direct standard input"
		<< std::endl
		<< "  -f, --file [input file name]" << "\t" <<
		 "find shortest paths in graph described by file input"
		<< std::endl
		<< "  -h, --help" << "\t\t\t" << "print this help menu"
		<< std::endl
		<< "  -v, --version" << "\t\t\t" << "print version information"
		<< std::endl;
}


void printerror(std::string error) {
	std::cout << std::string(error.begin(), error.end())
		<< "." << std::endl
		<< "use the -help flag for usage and options." << std::endl;
}


std::unique_ptr<Matrix> adj_list_to_adj_matrix(std::vector<int> list)
{

	std::unique_ptr<Matrix> adj_matrix(new Matrix(list[0]));
	for(size_t i = 2; i < list.size(); i+=3)
	{
		adj_matrix->operator()(list[i], list[i + 1]) = list[i + 2];
	}
	return adj_matrix;
}

std::unique_ptr<Matrix> adj_list_to_adj_matix_file_input(const std::string file_name)
{
	std::ifstream myReadFile;
	myReadFile.open(file_name);
	try {
		if (myReadFile.is_open()) {
			std::string str;
			std::string str2;
			std::string str3;

			myReadFile >> str;
			std::unique_ptr<Matrix> adj_matrix(new Matrix(stoi(str)));
			myReadFile >> str;
			int temp = stoi(str);
			for (int i = 0; i < temp; i++)
			{
				myReadFile >> str;
				myReadFile >> str2;
				myReadFile >> str3;
				adj_matrix->operator()(std::stoi(str), std::stoi(str2)) = stoi(str3);
			}
			myReadFile.close();
			return adj_matrix;
		}else
		{
			throw std::runtime_error("");
		}
	}
	catch(...)
	{
		printerror("Bad input");
		myReadFile.close();
	};
	return nullptr;
}


template <typename TimePoint>
std::chrono::milliseconds to_ms(TimePoint tp) {
	return std::chrono::duration_cast<std::chrono::milliseconds>(tp);
}


int main(int argc, char **argv) {

	//generateAdjacencyList(1000);
	//return 0;

	//default arguments
	bool file_input = false;
	std::string file_name;
	bool direct_input = false;
	std::vector<int> direct_data;
	bool multi_thread = false;

	std::string arg;
	for (int i = 1; i < argc; ++i)
	{
		arg = argv[i];
		if (arg == "--version" || arg == "-v") { version(); return 0; }
		else if (arg == "--help" || arg == "-h") { help(); return 0; }
		else if (arg == "--mthread" || arg == "-m") { multi_thread = true; }
		else if (arg == "--file" || arg == "-f")
		{
			if(direct_input)
			{
				printerror("You just wanted to use direct input, these two way are incompatible");
				return 0;
			}
			file_input = true;
			file_name = argv[++i];
			if (!std::ifstream(file_name).good()) {
				printerror("file not accessible");
				return 1;
			}
		}
		else if (arg == "--direct" || arg == "-d")
		{
			if (file_input)
			{
				printerror("You just wanted to use file input, these two way are incompatible");
				return 1;
			}
			direct_input = true;
			//std::stoi(argv[i + 2]) * 6 + 4)
			direct_data.reserve(std::stoi(argv[i + 1]));
			for (int k = i + 1; k < i +(std::stoi(argv[i + 2]) * 3) + 3; k++)
			{
				if(k == argc)
				{
					{ printerror("Too short input."); return 0; }
				}
				try
				{
					direct_data.push_back(std::stoi(argv[k]));
				}catch(...)
				{
					{ printerror("Bad input"); return 0; }
				}
			}
			i = i + (std::stoi(argv[i + 2]) * 3) + 2;
		}
		else { printerror("Not an existing argument"); return 0; }
	}

	//TESTING
	/*std::cout << "TESTS:" << std::endl;
	std::cout <<"file input: "<< file_input << std::endl;
	std::cout << "direct input: " << direct_input << std::endl;
	std::cout << "multithread input: " << multi_thread << std::endl;
	std::cout << "file name: " << file_name << std::endl;*/
	//TESTING


	std::unique_ptr<Matrix> adj_matrix;
	if(direct_input)
	{
		adj_matrix = adj_list_to_adj_matrix(direct_data);
	}
	else if(file_input)
	{
		adj_matrix = adj_list_to_adj_matix_file_input(file_name);
	}
	
	std::cout << "===================== ORIGINAL  ADJACENCY  TABLE =====================" << std::endl;
	if (!(adj_matrix->get_ncols() > 50))
		std::cout << *adj_matrix;
	else
		std::cout << "Logging would take forever...."<<std::endl;
	std::cout << std::endl;
	std::cout << "===================== ALGORITHM INITIALIZATION =====================" << std::endl;
	std::unique_ptr<Floyd_Warshall>f = std::make_unique<Floyd_Warshall>(*adj_matrix);
	if (!(adj_matrix->get_ncols() > 50))
		std::cout << *f;
	else
		std::cout << "Logging would take forever...." << std::endl;
	std::cout << std::endl;
	std::cout << "===================== ALGORITHM  RUN =====================" << std::endl;
	if(multi_thread)
	{
		std::cout << "MULTI THREAD" << std::endl;
		std::cout << "vertexes: " << adj_matrix->get_ncols()<< std::endl;
		auto start = std::chrono::high_resolution_clock::now();
		try
		{
			f->run_parallel();
		}
		catch (...)
		{
			printerror("GRAPH INCLUDES NEGATIVE CYCLES AND FLOYD WARSHALL IS NOT DESIGNED FOR THESE GRAPHS!!");
			return 1;
		}
		auto end = std::chrono::high_resolution_clock::now();
		if(adj_matrix->get_ncols() < 50)
		{
			std::cout << *f;
		}
		std::cout << std::endl;
		if (!(adj_matrix->get_ncols() > 200))
		{
			f->print_result();
		}
		else
		{
			std::cout << "Logging would take forever...." << std::endl;
		}
		std::cout << "--------------------------------------------------------------" << std::endl;
		std::cout << "Needed " << to_ms(end - start).count() << " ms to finish.\n";
		std::cout << "--------------------------------------------------------------" << std::endl;
	}
	else
	{
		std::cout << "SINGLE THREAD" << std::endl;
		std::cout << "vertexes: " << adj_matrix->get_ncols() << std::endl;
		auto start = std::chrono::high_resolution_clock::now();
		try
		{
			f->run();
		}
		catch(...)
		{
			printerror("GRAPH INCLUDES NEGATIVE CYCLES AND FLOYD WARSHALL IS NOT DESIGNED FOR THESE GRAPHS!!");
			return 1;
		}
		auto end = std::chrono::high_resolution_clock::now();
		if (!(adj_matrix->get_ncols() > 50))
		{
			std::cout << *f;
		}
		std::cout << std::endl;
		if (!(adj_matrix->get_ncols() > 200))
		{
			f->print_result();
		}else
		{
			std::cout << "Logging would take forever...." << std::endl;
		}
		std::cout << "--------------------------------------------------------------" << std::endl;
		std::cout << "Needed " << to_ms(end - start).count() << " ms to finish.\n";
		std::cout << "--------------------------------------------------------------" << std::endl;
	}


	//build graph        OK
		//diagonal 0	OK
		//precedessors table   OK
	//Warshall Floyd          OK
		//shortest path    OK
			//single thread    OK
			//multi thread     OK?
		//negative cycles detection    OK
	//threads           OK?
	//time delay         OK
	//test, refactor, valgrind, compile
	//prepare for accept
		//testing data - big graphs
		//test results
		//description

}

