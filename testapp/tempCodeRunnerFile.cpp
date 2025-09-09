#include <iostream>
#include <set> 

int main () {
    using std::cout; 
    using std::cin; 
    using std::string;

    std::set<char> seen; 
    string risposta; 
    string my_string = "Ciao Cpp, All'acquila piace il ketchup?"; 
    cout << my_string; 
    cin >> risposta; 
    
    return 0; 
} 