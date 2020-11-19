import React from "react";

export const temp: React.FC<undefined> = () => {
    return (
        <div></div>
    );
}
/*
configure({ adapter: new Adapter() });

it("renders LoginComp when the Main Navbar is rendered", () => {

  const fakeStore = configureStore([]);
  const store = fakeStore({
    id: 5,
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    picUrl: "",
    status: "",
    bio: "",
    interests: "",
    posts: null,
    likedPosts: null,
    verified: false
  })

  //const mainNav = () => {
      //return <Provider store={store} ><MainNavbar /></Provider>
  //}
  //const actualMainNav = mainNav();
  
  const mainNavActual = shallow(<Provider store={store} ><MainNavbar /></Provider>);
  expect(mainNavActual.contains(<ForgotPassComp/>)).toEqual(false);
});

*/