import { jest } from '@jest/globals';
import { addStudent } from '../controllers/adminController.js';

// Mock the dependencies
jest.unstable_mockModule('../models/Student.js', () => ({
  default: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
  })),
  findOne: jest.fn(),
}));

jest.unstable_mockModule('bcrypt', () => ({
  hash: jest.fn(),
}));

describe('addStudent Controller (Unit Test)', () => {
  let req, res;
  let Student, bcrypt;

  beforeEach(async () => {
    // Dynamically import after mocking
    const StudentModule = await import('../models/Student.js');
    Student = StudentModule.default;
    Student.findOne = StudentModule.findOne;

    bcrypt = await import('bcrypt');

    req = {
      body: {
        name: 'John Doe',
        regno: 12345,
        section: 'A',
        semester: 1,
        year: 2023,
        password: 'password123',
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should add a new student successfully', async () => {
    Student.findOne.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hashedPassword123');

    const mockSavedStudent = {
      name: 'John Doe',
      regno: 12345,
      section: 'A',
      semester: 1,
      year: 2023,
      password: 'hashedPassword123',
    };

    Student.prototype.save.mockResolvedValue(mockSavedStudent);

    await addStudent(req, res);

    expect(Student.findOne).toHaveBeenCalledWith({ regno: 12345 });
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(Student.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Student added successfully',
      student: mockSavedStudent,
    });
  });
});
