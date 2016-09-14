/* Person and Student objects and prototype methods for Exercise 2.1 and 2.2
*  CS336, Fall 2016
*  Created by Cotter Koopman, cjk45 */

//EXERCISE 2.1
//Declare a person with default attributes
function Person(name, birth) {
  this.name = name;
  this.birth = new Date(birth);
  //By default starts with no friends
  this.friends = [];
}

//Accessor for identifying people by their names
Person.prototype.getName = function() {
  return this.name;
};

//Mutator for name, takes a string argument
Person.prototype.changeName = function (newName) {
  this.name = newName;
  console.info('Name changed.');
};

//Mutator for birth date, takes a string argument in form "YYYY/MM/DD"
Person.prototype.changeBirth = function (newBirth) {
  this.birth = new Date(newBirth);
  console.info('Birthdate changed.');
};

//Accessor that computes age, adapted from Naveen Jose's function
Person.prototype.getAge = function() {
    var today = new Date();
    var age = today.getFullYear() - this.birth.getFullYear();
    var m = today.getMonth() - this.birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.birth.getDate())) {
        age--;
    }
    return age;
}

//Mutator to add friends to a person's list of friends. Takes Person object argument
Person.prototype.addFriend = function(newPerson) {
    this.friends.push(newPerson);
    console.info(this.name + ' is now friends with ' + newPerson.name);
}

//Greeting method
Person.prototype.printGreeting = function() {
    console.log(this.name + " says, 'I'm a person.'");
}

//EXERCISE 2.1 TESTING
var test1 = new Person("Christian", "2000/01/01");
console.log("test1 name is " + test1.getName());
test1.changeName('Javin');
console.log("test1 name is " + test1.getName());
console.log("test1 age is " + test1.getAge());
test1.changeBirth("1994/11/11");
console.log("test1 age is " + test1.getAge());

var test2 = new Person('Default');
test2.changeName('Cotter');
test1.addFriend(test2);


//EXERCISE 2.2
//Declare a student class
function Student(name, birth, subject) {
    //inherets same constructor as person for name and birthdate
    Person.call(this, name, birth);
    //with an added subject
    this.subject = subject;
}

//Declares the student class as a child of person
Student.prototype = Object.create(Person.prototype);

//Polymorphism, making the same-named function (printGreeting)
//do something different for a student
Student.prototype.printGreeting = function() {
    console.log(this.name + " says, 'I'm a student and I'm studying " + this.subject +".'");
}

//EXERCISE 2.2 TESTING

var test3 = new Student("Nate", "1995/06/05", "CS");
//Make sure all person methods still work on a student
console.log(test3.getName() + " is " + test3.getAge());
test3.addFriend(test1);
test3.changeName('Ben');
test3.changeBirth("1900/01/01");

//test 1 and 2 are people, but 3 is a student.
test1.printGreeting(); //I'm a person...
test2.printGreeting();
test3.printGreeting(); //I'm a student...

//Test1 is a person, but not a student
console.log(test1 instanceof Person); //true
console.log(test1 instanceof Student); //false

//Test3 is a student, and therefore also a person
console.log(test3 instanceof Person); //true
console.log(test3 instanceof Student); //true
