"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <span id="trash">&#x1F5D1</span>
        <span id="star">&#10025</span>
        <a href="${story.url}" target="a_blank" class="story-link">
        ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}
/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}


async function createNewStory(e){
    e.preventDefault()
    const user = currentUser.username
    const author = $("#author").val() 
    const title = $("#title").val()
    const url = $("#url").val()
    const newStory = {author, title, url}
    // const allStories = await StoryList.getStories(currentUser, newStory)
    const story = await storyList.addStory(currentUser, newStory)
    const myStory = generateStoryMarkup(story)
    currentUser.ownStories.unshift(story)
    $allStoriesList.prepend(myStory)
    // const myStory2 = generateStoryMarkup(story)
    // $myStories.prepend(myStory2)
    $allStoriesList.show()
    

}
  
  $submitStoryForm.on("submit", createNewStory);



  async function deleteStory(evt) {
    const $closestLi = $(evt.target).closest("li");
    const $storyId = $closestLi.attr("id");
    // const token = currentUser.loginToken
    await axios({url: `${BASE_URL}/stories/${$storyId}`, method: 'DELETE', data:{token: currentUser.loginToken}})
    // await axios.delete(`${BASE_URL}/stories/${$storyId}`, {token})
  
    // $closestLi.remove()
    currentUser.ownStories.shift($closestLi)
    getAndShowStoriesOnStart()
  }
  
  $("#my-stories").on("click", "#trash", deleteStory);

  
  function displyMyStories() {
    $myStories.empty()
    if(currentUser.ownStories.length === 0){
      $myStories.append("My Story List is Empty")
      }
    else{
      for (let story of currentUser.ownStories) {
        const stories = generateStoryMarkup(story);
        $myStories.append(stories)
    }}
    $myStories.show()
  }