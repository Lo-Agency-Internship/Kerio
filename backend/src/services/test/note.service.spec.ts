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
});
