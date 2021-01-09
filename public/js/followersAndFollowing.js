$(document).ready(() => {
  if (selectedTab === "followers") {
    loadFollowers();
  } else {
    loadFollowing();
  }
});

function loadFollowers() {
  $.get(`/api/users/${profileUserId}/followers`, (results) => {
    outputUsers(results.followers, $(".resultContainer"));
  });
}

function loadFollowing() {
  $.get(`/api/users/${profileUserId}/following`, (results) => {
    outputUsers(results.following, $(".resultContainer"));
  });
}
