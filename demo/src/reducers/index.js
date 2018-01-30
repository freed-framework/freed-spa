/**
 * @file index.js
 * @author denglingbo
 *
 * Reducers Entry
 */
import Immutable from 'immutable';

/**
 * pub.js & user.js Required
 */
import pub from './pub';
import user from './user';
import book from './book';

/**
 * init package inject part
 *
 * eg: import {module name} from './{path}';
 */
/* START-INJECT-<REDUCERS-IMPORT> */
/* END-INJECT-<REDUCERS-IMPORT> */

export default Immutable.fromJS({
    pub,
    user,

    /**
     * Others Reducers
     */
    book,

    /**
     * init package inject part
     */
    /* START-INJECT-<REDUCERS> */
    /* END-INJECT-<REDUCERS> */
});
