import Amplify, { Auth } from "aws-amplify";
import { axiosInstance } from './axiosConfig';
import awsconfig from '../aws-exports';


beforeAll(() => {
    Amplify.configure(awsconfig);


});
/**
   * @Test
   * Axios Config File
   */
it("Returns an axios", async () => {
    Auth.currentSession = jest.fn().mockResolvedValue({
        CognitoUserSession: {
            idToken: {
                jwtToken: "test"
            }
        },
        getIdToken: jest.fn().mockReturnValue({ getJwtToken: jest.fn().mockReturnValue("SecretTestToken") })
    });

    let axiosPromise: any;
    let header: string = "";
    axiosPromise = await axiosInstance();
    header = axiosPromise.defaults.headers['Authorization'];

    expect(header).toBe("Bearer SecretTestToken");
});