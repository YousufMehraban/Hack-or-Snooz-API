"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();

}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();

}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $("#add-story").hide()


  $navUserProfile.text(`${currentUser.username}`).show();
}


function updateNavSubmit(){
  hidePageComponents()
  $("#add-story").show()
}

$("#nav-submit").on('click', updateNavSubmit);


function updateFavStories(e) {
  hidePageComponents()
  $favStories.show()
}

$("#nav-favorite").on('click', updateFavStories)

function showMyStories() {
  hidePageComponents()
  displyMyStories()
  $myStories.show()
}

$("#nav-my-stories").on('click', showMyStories)


function AddToFavList(e) {
  hidePageComponents()
  if(e.target.id === 'star'){
    $favStories.append(e.target.parentElement);
  }
  $favStories.show();
  // e.target.id.setAttribute('checked'='true')
}

$("#all-stories-list").on('click', '#star', AddToFavList)


