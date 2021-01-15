import firebase from 'firebase/app'
import 'firebase/auth'
import * as FBC from './FirebaseContainer'
// import {firebaseConfig} from './FirebaseContainer'

jest.mock('firebase/app', () => {
  return {
    auth: jest.fn(),
  }
});

describe('firebase tests', () => {
  it('should return mock user',() => {
    (firebase.auth as jest.Mocked<any>).mockReturnValue({
      currentUser: { email: 'example@gmail.com', uid: "person", emailVerified: true },
      signOut: function() { return true; },
      createUserWithEmailAndPassword: () => true,
    });
      //need to call otherwise somehow
    expect(firebase.auth().currentUser).toEqual({ email: 'example@gmail.com', uid: "person", emailVerified: true });
  });
})
