import * as should from 'should';
import 'mocha';

import { MapField } from './mapfield'

describe('MapField', () => {
  it('should create a mapfield empty', () => {
    let mapfield:MapField = new MapField();
    should(mapfield).be.ok();
  })
})
