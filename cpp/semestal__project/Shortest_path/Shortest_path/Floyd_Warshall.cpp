#include "Floyd_Warshall.h"
#include <omp.h>


Floyd_Warshall::Floyd_Warshall(const Matrix adj_table)
{
	//std::cout << "Floyd-Marshal initialized" << std::endl;
	this->price_table = new Matrix(adj_table);
	this->original_input_graph = new Matrix(adj_table);
	ready();
	
}

Floyd_Warshall::~Floyd_Warshall()
{
	//std::cout << "Floyd-Marshal destroyed" << std::endl;
	delete original_input_graph;
	delete price_table;
	delete precedessor_table;
}

void Floyd_Warshall::print_result()
{
	std::cout << "------------------RESULTS-----------------------" << std::endl;
	std::cout << "SOURCE    DESTINATION    PRICE    PATH" << std::endl;
	for (size_t k = 0; k < price_table->get_nrows(); k++)
	{
		for (size_t i = 0; i < price_table->get_nrows(); i++)
		{
			std::cout << "   " << k << "   " << "       " << i << "            "; 
			if(price_table->operator()(k, i) == INF)
			{
				std::cout << "INF";
			}else
			{
				std::cout << price_table->operator()(k, i);
			}
			std::cout	<< "        ";
			print_path(k, i);
			std::cout << std::endl;
		}
	}
	std::cout << "===============================================" << std::endl;
	std::cout << "===================== END =====================" << std::endl;
}

void Floyd_Warshall::run()
{
	for(size_t k = 0; k < price_table->get_nrows(); k++)
	{
		for (size_t i = 0; i < price_table->get_nrows(); i++)
		{
			for(size_t j = 0; j < price_table->get_nrows(); j++)
			{
				if(price_table->operator()(i, k) == INF || price_table->operator()(k, j) ==INF)
				{
					continue;
				}
				if(price_table->operator()(i, k)+price_table->operator()(k, j) < price_table->operator()(i, j))
				{
					if(i == j)
					{
						throw new std::runtime_error("");
					}
					price_table->operator()(i, j) = price_table->operator()(i, k) + price_table->operator()(k, j);
					precedessor_table->operator()(i, j) = k;
				}
			}
		}
	}
}

void Floyd_Warshall::run_parallel()
{
	int i, j, k;

	for (size_t k = 0; k < price_table->get_nrows(); k++)
	{
		#pragma omp parallel for private(i,j)
		for (int i = 0; i < price_table->get_nrows(); i++)
		{
			for (int j = 0; j < price_table->get_nrows(); j++)
			{
				if (price_table->operator()(i, k) == INF || price_table->operator()(k, j) == INF)
				{
					continue;
				}
				if (price_table->operator()(i, k) + price_table->operator()(k, j) < price_table->operator()(i, j))
				{
					if (i == j)
					{
						throw new std::runtime_error("");
					}
					price_table->operator()(i, j) = price_table->operator()(i, k) + price_table->operator()(k, j);
					precedessor_table->operator()(i, j) = k;
				}
			}
		}
	}
}

void Floyd_Warshall::print_path(int i, int j)
{
	if(i == j)
	{
		std::cout << i;
	}
	else if (precedessor_table->operator()(i, j) == i)
	{
		std::cout << i << "-" << j;
	}
	else if(precedessor_table->operator()(i, j) == INF)
	{
		std::cout << "no path";
	}
	else
	{
		std::string result;

		while (precedessor_table->operator()(i, j) != i)
		{
			result = "-" + std::to_string(j)+result;
			/*result.insert(0, std::to_string(j));
			result.insert(0, "-");*/
			j = precedessor_table->operator()(i, j);
		}
		result = "-" + std::to_string(j) + result;
		result = std::to_string(i) + result;
		//result.insert(0, std::to_string(i));
	std::cout << result;
	}
}

void Floyd_Warshall::ready()
{
	this->precedessor_table = new Matrix(price_table->get_nrows());
	for (size_t i = 0; i < price_table->get_nrows(); i++)
	{
		for (size_t j = 0; j < price_table->get_nrows(); j++)
		{
			if (price_table->operator()(i, j) == INF)
			{
				if (i == j)
				{
					price_table->operator()(i, j) = 0;
				}
				precedessor_table->operator()(i, j) = INF;
			}
			else
			{
				if (i == j)
				{
					std::cout << "This graph has negative cycles, or is invalid" << std::endl;
				}
				precedessor_table->operator()(i, j) = i;
			}
		}
	}
}


std::ostream& operator<<(std::ostream& out, Floyd_Warshall const& g)
{
	out << "PRICE TABLE" << std::endl;
	out << *g.price_table;
	out << "PRECEDESSORS TABLE" << std::endl;
	out << *g.precedessor_table;
	out << std::endl;
	return out;
}
