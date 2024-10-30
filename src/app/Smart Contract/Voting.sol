// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract Voting {
    struct Question {
        uint256 id;
        string questionText;
        string[] options;
        uint256[] votes;
        address author;
    }

    mapping (uint256 => Question) public questions;
    mapping (uint256 => mapping (address => bool)) public hasVoted;

    uint256 counter = 0;

    // Event to emit when a question is added
    event QuestionAdded(uint256 indexed id, string questionText, address author);

    function addQuestion(string memory _question, string[] memory _options) public returns (uint256) {
        Question memory newQuestion;
        newQuestion.id = counter;
        newQuestion.questionText = _question;
        newQuestion.options = _options;
        newQuestion.votes = new uint256[](_options.length);
        newQuestion.author = msg.sender;

        questions[counter] = newQuestion;
        
        // Emit event with the new question ID and details
        emit QuestionAdded(counter, _question, msg.sender);

        counter += 1;
        return counter - 1;
    }

    function vote(uint256 _id, uint256 _optionIndex) public {
        require(_id < counter, "Question does not exist");
        require(_optionIndex < questions[_id].options.length, "Invalid option index");
        require(!hasVoted[_id][msg.sender], "Cannot vote more than once");

        questions[_id].votes[_optionIndex] += 1;
        hasVoted[_id][msg.sender] = true;
    }

    function getQuestion(uint256 _id) public view returns (string memory, string[] memory, address, uint256[] memory) {
        require(_id < counter, "ID out of range");
        Question memory q = questions[_id];
        return (q.questionText, q.options, q.author, q.votes);
    }

    function getCounter() public view returns (uint256) {
        return (counter);
    }
}
