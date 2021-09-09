#pragma once
#include "headers.h"
#include <memory>
#include "Matrix.h"

class Floyd_Warshall
{
	Matrix* original_input_graph;
	Matrix* price_table;
	Matrix* precedessor_table;

public:
	Floyd_Warshall(const Matrix adj_table);
	~Floyd_Warshall();
	void print_result();
	void run();
	void run_parallel();
	friend std::ostream& operator<< (std::ostream &out, Floyd_Warshall const& g);
private:
	void print_path(int i, int j);
	void ready();;
};

