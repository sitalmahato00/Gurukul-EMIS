<?php

namespace Database\Seeders;

use App\Models\{LibraryBook, LibraryIssue, Student};
use Illuminate\Database\Seeder;

class LibrarySeeder extends Seeder
{
    public function run(): void
    {
        $schoolId = 1;
        $students = Student::where('school_id', $schoolId)->get();
        $librarianId = \App\Models\User::where('school_id', $schoolId)->where('role', 'librarian')->first()?->id;

        $books = [
            ['title' => 'NCERT Mathematics Class 5', 'author' => 'NCERT', 'isbn' => '978-8174504821', 'category' => 'Textbook', 'publisher' => 'NCERT', 'edition' => '2024', 'total_copies' => 5, 'rack_number' => 'R1'],
            ['title' => 'NCERT Science Class 5', 'author' => 'NCERT', 'isbn' => '978-8174503862', 'category' => 'Textbook', 'publisher' => 'NCERT', 'edition' => '2024', 'total_copies' => 5, 'rack_number' => 'R1'],
            ['title' => 'NCERT English Marigold Class 5', 'author' => 'NCERT', 'isbn' => '978-8174503589', 'category' => 'Textbook', 'publisher' => 'NCERT', 'edition' => '2024', 'total_copies' => 4, 'rack_number' => 'R1'],
            ['title' => 'NCERT Hindi Rimjhim Class 5', 'author' => 'NCERT', 'isbn' => '978-8174503510', 'category' => 'Textbook', 'publisher' => 'NCERT', 'edition' => '2024', 'total_copies' => 4, 'rack_number' => 'R1'],
            ['title' => 'NCERT Social Studies Our World Class 5', 'author' => 'NCERT', 'isbn' => '978-8174503749', 'category' => 'Textbook', 'publisher' => 'NCERT', 'edition' => '2024', 'total_copies' => 3, 'rack_number' => 'R1'],
            ['title' => 'Computer Basics for Kids', 'author' => 'Rajesh Kumar', 'isbn' => '978-8120352315', 'category' => 'Computer', 'publisher' => 'PHI Learning', 'edition' => '3rd', 'total_copies' => 3, 'rack_number' => 'R2'],
            ['title' => 'Wings of Fire', 'author' => 'APJ Abdul Kalam', 'isbn' => '978-8173701870', 'category' => 'Biography', 'publisher' => 'Universities Press', 'edition' => '2011', 'total_copies' => 2, 'rack_number' => 'R3'],
            ['title' => 'The Story of My Life', 'author' => 'Helen Keller', 'isbn' => '978-0486285566', 'category' => 'Biography', 'publisher' => 'Dover Publications', 'edition' => '1990', 'total_copies' => 2, 'rack_number' => 'R3'],
            ['title' => 'Panchatantra Stories', 'author' => 'Vishnu Sharma', 'isbn' => '978-8128600364', 'category' => 'Fiction', 'publisher' => 'Saraswati House', 'edition' => '2018', 'total_copies' => 3, 'rack_number' => 'R4'],
            ['title' => 'Akbar and Birbal Stories', 'author' => 'Amar Chitra Katha', 'isbn' => '978-8184821239', 'category' => 'Fiction', 'publisher' => 'Amar Chitra Katha', 'edition' => '2015', 'total_copies' => 2, 'rack_number' => 'R4'],
            ['title' => 'The Jungle Book', 'author' => 'Rudyard Kipling', 'isbn' => '978-0141325262', 'category' => 'Fiction', 'publisher' => 'Puffin Books', 'edition' => '2014', 'total_copies' => 2, 'rack_number' => 'R4'],
            ['title' => 'Alice in Wonderland', 'author' => 'Lewis Carroll', 'isbn' => '978-0141325286', 'category' => 'Fiction', 'publisher' => 'Puffin Books', 'edition' => '2014', 'total_copies' => 2, 'rack_number' => 'R4'],
            ['title' => 'Charlie and the Chocolate Factory', 'author' => 'Roald Dahl', 'isbn' => '978-0141325293', 'category' => 'Fiction', 'publisher' => 'Puffin Books', 'edition' => '2016', 'total_copies' => 2, 'rack_number' => 'R4'],
            ['title' => 'Harry Potter and the Philosopher\'s Stone', 'author' => 'JK Rowling', 'isbn' => '978-0747532743', 'category' => 'Fiction', 'publisher' => 'Bloomsbury', 'edition' => '2014', 'total_copies' => 3, 'rack_number' => 'R5'],
            ['title' => 'Mathematics Reference Guide', 'author' => 'RD Sharma', 'isbn' => '978-8193373118', 'category' => 'Reference', 'publisher' => 'Dhanpat Rai', 'edition' => '2023', 'total_copies' => 4, 'rack_number' => 'R6'],
            ['title' => 'Science Experiments Book', 'author' => 'Arun Khetarpal', 'isbn' => '978-8183331647', 'category' => 'Reference', 'publisher' => 'S Chand', 'edition' => '2020', 'total_copies' => 3, 'rack_number' => 'R6'],
            ['title' => 'General Knowledge 2024', 'author' => 'Manohar Pandey', 'isbn' => '978-9389390742', 'category' => 'Reference', 'publisher' => 'Arihant', 'edition' => '2024', 'total_copies' => 2, 'rack_number' => 'R6'],
            ['title' => 'English Grammar and Composition', 'author' => 'Wren and Martin', 'isbn' => '978-8183071147', 'category' => 'Reference', 'publisher' => 'S Chand', 'edition' => '2018', 'total_copies' => 3, 'rack_number' => 'R6'],
            ['title' => 'Hindi Vyakaran', 'author' => 'Dr. Brij Kishore Prasad', 'isbn' => '978-8183331234', 'category' => 'Reference', 'publisher' => 'S Chand', 'edition' => '2020', 'total_copies' => 2, 'rack_number' => 'R6'],
            ['title' => 'Environmental Studies', 'author' => 'VK Gaur and Shalini Gaur', 'isbn' => '978-8183331456', 'category' => 'Textbook', 'publisher' => 'S Chand', 'edition' => '2021', 'total_copies' => 2, 'rack_number' => 'R1'],
            ['title' => 'VEDIC MATHEMATICS', 'author' => 'Jagadguru Swami Sri Bharati Krishna Tirthaji', 'isbn' => '978-8179925548', 'category' => 'Reference', 'publisher' => 'Motilal Banarsidass', 'edition' => '2015', 'total_copies' => 1, 'rack_number' => 'R6'],
            ['title' => 'The Alchemist', 'author' => 'Paulo Coelho', 'isbn' => '978-0062511409', 'category' => 'Fiction', 'publisher' => 'HarperOne', 'edition' => '2014', 'total_copies' => 2, 'rack_number' => 'R5'],
            ['title' => 'Diary of a Young Girl', 'author' => 'Anne Frank', 'isbn' => '978-0553296983', 'category' => 'Biography', 'publisher' => 'Bantam', 'edition' => '1993', 'total_copies' => 2, 'rack_number' => 'R3'],
            ['title' => 'Oliver Twist', 'author' => 'Charles Dickens', 'isbn' => '978-0141439976', 'category' => 'Fiction', 'publisher' => 'Penguin', 'edition' => '2003', 'total_copies' => 1, 'rack_number' => 'R5'],
            ['title' => 'Treasure Island', 'author' => 'Robert Louis Stevenson', 'isbn' => '978-0141324517', 'category' => 'Fiction', 'publisher' => 'Puffin', 'edition' => '2012', 'total_copies' => 1, 'rack_number' => 'R5'],
            ['title' => 'Robinson Crusoe', 'author' => 'Daniel Defoe', 'isbn' => '978-0141439418', 'category' => 'Fiction', 'publisher' => 'Penguin', 'edition' => '2003', 'total_copies' => 1, 'rack_number' => 'R5'],
            ['title' => 'Introduction to Algorithms', 'author' => 'Thomas H. Cormen', 'isbn' => '978-0262033848', 'category' => 'Computer', 'publisher' => 'MIT Press', 'edition' => '3rd', 'total_copies' => 1, 'rack_number' => 'R2'],
            ['title' => 'C Programming Language', 'author' => 'Brian W. Kernighan', 'isbn' => '978-0131103627', 'category' => 'Computer', 'publisher' => 'Pearson', 'edition' => '2nd', 'total_copies' => 1, 'rack_number' => 'R2'],
            ['title' => 'Python for Kids', 'author' => 'Jason R. Briggs', 'isbn' => '978-1593274078', 'category' => 'Computer', 'publisher' => 'No Starch Press', 'edition' => '2012', 'total_copies' => 2, 'rack_number' => 'R2'],
            ['title' => 'Web Design for Beginners', 'author' => 'Laura Lemay', 'isbn' => '978-8173665264', 'category' => 'Computer', 'publisher' => 'BPB', 'edition' => '2019', 'total_copies' => 1, 'rack_number' => 'R2'],
        ];

        $booksCreated = [];
        foreach ($books as $bookData) {
            $bookData['school_id'] = $schoolId;
            $bookData['available_copies'] = $bookData['total_copies'];
            $bookData['is_active'] = true;
            $booksCreated[] = LibraryBook::create($bookData);
        }

        // Create some issue records
        for ($i = 0; $i < 12; $i++) {
            $book = $booksCreated[array_rand($booksCreated)];
            $student = $students[array_rand($students->toArray())];

            $issueDate = now()->subDays(rand(5, 30));
            $isReturned = $i < 8;
            $returnDate = $isReturned ? $issueDate->copy()->addDays(rand(3, 14)) : null;

            LibraryIssue::create([
                'book_id' => $book->id,
                'student_id' => $student->id,
                'teacher_id' => null,
                'issue_date' => $issueDate,
                'due_date' => $issueDate->copy()->addDays(14),
                'return_date' => $returnDate,
                'fine_amount' => $isReturned && $returnDate->greaterThan($issueDate->copy()->addDays(14))
                    ? $returnDate->diffInDays($issueDate->copy()->addDays(14)) * 5
                    : 0,
                'status' => $isReturned ? 'returned' : ($issueDate->copy()->addDays(14)->isPast() ? 'overdue' : 'issued'),
                'issued_by' => $librarianId,
            ]);

            if ($isReturned) {
                // don't decrement for returned books (already counted)
            } else {
                $book->decrement('available_copies');
            }
        }
    }
}
