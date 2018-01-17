import * as user from './user.sagas';
import * as planet from './planet.sagas';
import { all } from "redux-saga/effects"


export default function* sagas() {
    yield all([
        ...user,
        ...planet
    ])
}