#pragma once
#include  "headers.h"


class Matrix
{
	size_t rows;
	size_t cols;
	signed int* data;

public:
	Matrix(int nRows, int nCols);
	Matrix(int dimension);
	Matrix(const Matrix& m);

	~Matrix();

	int& operator()(size_t i, size_t j);
	int operator()(size_t i, size_t j) const;

	friend std::ostream& operator<< (std::ostream &out, Matrix const& matrix);

	size_t get_nrows();
	size_t get_ncols();

};

