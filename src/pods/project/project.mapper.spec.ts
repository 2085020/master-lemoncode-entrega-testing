import * as projectMapper from './project.mapper';
import * as apiModel from './api/project.api-model';
import * as viewModel from './project.vm';
import * as collection from 'common/mappers/collection.mapper';

describe('pods/project/project.mapper', () => {
  it('should return empty project when mapping null', () => {
    // ARRANGE
    const emptyModel = viewModel.createEmptyProject();
    const spy = jest.spyOn(viewModel, "createEmptyProject");
    // ACT
    const returnModel = projectMapper.mapProjectFromApiToVm(null);
    // ASSERT
    expect(returnModel).toEqual(emptyModel);
    expect(spy).toBeCalledTimes(1);
  });

  it('should return empty project when mapping undefined', () => {
    // ARRANGE
    const emptyModel = viewModel.createEmptyProject();
    const spy = jest.spyOn(viewModel, "createEmptyProject");
    // ACT
    const returnModel = projectMapper.mapProjectFromApiToVm(undefined);
    // ASSERT
    expect(returnModel).toEqual(emptyModel);
    expect(spy).toBeCalledTimes(1);
  });

  it('should return minimal data when sending just mandatory data', () => {
    // ARRANGE
    const initialModel: apiModel.Project = {
      id: '1',
      isActive: true,
      name: 'test name',
      employees: [],
    };
    // ACT
    const returnModel = projectMapper.mapProjectFromApiToVm(initialModel);
    // ASSERT
    expect(returnModel.id).toEqual(initialModel.id);
    expect(returnModel.isActive).toEqual(initialModel.isActive);
    expect(returnModel.name).toEqual(initialModel.name);
    expect(returnModel.employees).toHaveLength(0);
  });

  it('should return minimal data when sending just mandatory data with null employees', () => {
    // ARRANGE
    const initialModel: apiModel.Project = {
      id: '1',
      isActive: true,
      name: 'test name',
      employees: null,
    };
    // ACT
    const returnModel = projectMapper.mapProjectFromApiToVm(initialModel);
    // ASSERT
    expect(returnModel.id).toEqual(initialModel.id);
    expect(returnModel.isActive).toEqual(initialModel.isActive);
    expect(returnModel.name).toEqual(initialModel.name);
    expect(returnModel.employees).toHaveLength(0);
  });

  it('should return minimal data when sending all data', () => {
    // ARRANGE

    const initialModel: apiModel.Project = {
      id: '1',
      isActive: true,
      name: 'test name',
      employees: [
        {
          employeeName: 'Test Name',
          id: '2',
        },
      ],
    };

    const spy = jest.spyOn(collection, "mapToCollection" );
    // ACT
    const returnModel = projectMapper.mapProjectFromApiToVm(initialModel);
    // ASSERT
    expect(returnModel.id).toEqual(initialModel.id);
    expect(returnModel.isActive).toEqual(initialModel.isActive);
    expect(returnModel.name).toEqual(initialModel.name);
    expect(returnModel.employees).toHaveLength(1);
    expect(returnModel.employees[0]).toEqual(initialModel.employees[0]);
    expect(spy).toBeCalledTimes(1);
  });

  it('should return minimal data when sending all data two times', () => {
    // ARRANGE

    const initialModel: apiModel.Project = {
      id: '1',
      isActive: true,
      name: 'test name',
      employees: [
        {
          employeeName: 'Test Name',
          id: '2',
        },
        {
          employeeName: 'Test Name 2',
          id: '3',
        },
      ],
    };

    const spy = jest.spyOn(collection, "mapToCollection" );
    // ACT
    const returnModel = projectMapper.mapProjectFromApiToVm(initialModel);
    // ASSERT
    expect(returnModel.id).toEqual(initialModel.id);
    expect(returnModel.isActive).toEqual(initialModel.isActive);
    expect(returnModel.name).toEqual(initialModel.name);
    expect(returnModel.employees).toHaveLength(2);
    expect(returnModel.employees[0]).toEqual(initialModel.employees[0]);
    expect(spy).toBeCalledTimes(1);
  });

  it('should return all data including optional when sending all data two times', () => {
    // ARRANGE
    const employees = [
      {
        employeeName: 'Test Name',
        id: '2',
      },
      {
        employeeName: 'Test Name 2',
        id: '3',
      },
    ];


    const initialModel: apiModel.Project = {
      id: '1',
      isActive: true,
      name: 'test name',
      comments: "test comments",
      externalId: "1234",
      employees: employees ,
    };

    const spy = jest.spyOn(collection, "mapToCollection" );
    // ACT
    const returnModel = projectMapper.mapProjectFromApiToVm(initialModel);
    // ASSERT
    expect(returnModel.id).toEqual(initialModel.id);
    expect(returnModel.isActive).toEqual(initialModel.isActive);
    expect(returnModel.name).toEqual(initialModel.name);
    expect(returnModel.externalId).toEqual(initialModel.externalId);
    expect(returnModel.comments).toEqual(initialModel.comments);
    expect(returnModel.employees).toHaveLength(2);
    expect(returnModel.employees[0]).toEqual(initialModel.employees[0]);
    expect(spy).toBeCalledTimes(1);
  });
});
