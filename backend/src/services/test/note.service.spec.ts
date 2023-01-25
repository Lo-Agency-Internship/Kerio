import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Note } from '../../entities/note.entity';
import { DeleteResult, Repository } from 'typeorm';
import { NoteService } from '../note.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  findAndCount: jest.fn(),
  softDelete: jest.fn(),
});


const noteStub = () => {
  return [
    [
      {
        title: 'test1',
        description: 'oiuy',
        score: 1,
        status: {},
        contact: {},
      },
      {
        title: 'test2',
        description: 'oiuy234',
        score: 0,
        status: {},
        contact: {},
      },
      {
        title: 'test3',
        description: 'oiuy2345',
        score: null,
        status: {},
        contact: {},
      },
    ],
    3,
  ];
};


describe('noteService', () => {
  let noteService: NoteService;
  let noteRepository;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        NoteService,
        { provide: getRepositoryToken(Note), useValue: createMockRepository() },
      ],
    }).compile();

    noteService = module.get<NoteService>(NoteService);
    noteRepository = module.get(getRepositoryToken(Note));
  });
  it('should be defined', () => {
    expect(noteService).toBeDefined();
  });
  describe('Delete method', () => {
    it('should delete the note if the id exists', async () => {
      const noteId = 1;
      const mockedDeletedResult: DeleteResult = { raw: 'any', affected: 1 };
      noteRepository.softDelete.mockReturnValue(mockedDeletedResult);
      expect(await noteService.delete({ id: noteId })).toEqual(
        mockedDeletedResult,
      );
    });
  });

  describe('readAllByContactId', () => {
    it('should return all notes for specific contact', async () => {
      const mockedNotes = noteStub();
      noteRepository.findAndCount.mockResolvedValue(mockedNotes);
      const expectedResult = {
        notes: [
          {
            title: 'test1',
            description: 'oiuy',
            score: 1,
            status: {},
            contact: {},
          },
          {
            title: 'test2',
            description: 'oiuy234',
            score: 0,
            status: {},
            contact: {},
          },
          {
            title: 'test3',
            description: 'oiuy2345',
            score: null,
            status: {},
            contact: {},
          },
        ],
        metadata: {
          total: 3,
          size: 3,
          page: 1,
        },
      };
      expect(
        await noteService.readAllByContactId({ id: 1, page: 1, size: 3 }),
      ).toEqual(expectedResult);
    });
  });
  it('should return empty list and total number equals zero if contact does not have any notes', async () => {
    const mockedResult = [[], 0];
    const expectedResult = {
      notes: [],
      metadata: { total: 0, size: 3, page: 1 },
    };
    noteRepository.findAndCount.mockResolvedValue(mockedResult);
    expect(
      await noteService.readAllByContactId({ id: 1, page: 1, size: 3 }),
    ).toEqual(expectedResult);
  });
});
