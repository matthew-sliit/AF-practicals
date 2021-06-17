import jest from 'jest';
import React from 'react';
import renderer from 'react-test-renderer';
import AddCategory from "../src/components/AddCategory";
import AddVehicle from "../src/components/AddVehicle";
/*
============== STATIC PAGES ============
where content doesn't change
 */
test('Add Category renders correctly',()=>{
    const component = renderer.create(<AddCategory/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Add Vehicle renders correctly',()=>{
    const component = renderer.create(<AddVehicle/>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});