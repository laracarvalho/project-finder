//////////////////////////////
/////// Project Finder //////
////////////////////////////

$(document).ready(function() {
  $('#searchUser').on('keyup', function(e) {
    let username = e.target.value;

    // Make request to Github
    $.ajax({
      url:'https://api.github.com/users/'+ username,
      data: {
        client_id:'d9308aacf8b204d361fd',
        client_secret:'62551cc02cee983fff0bac41baf170eb5a312c1c'
      }
    }).done(function(user) {
      $.ajax({
        url:'https://api.github.com/users/'+ username +'/repos',
        data:{
          client_id:'',
          client_secret:'',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos) {
        $.each(repos, function(index, repo) {
          $('#repos').append(`
              <div class="ui card">
                <div class="header">
                  <strong>${repo.name}</strong>:</div>
                  <div class="description"> ${repo.description}</div>
                  <div class="extra content">
                  <i class="heart icon"></i><span class="label">Forks: ${repo.forks_count}</span>
                  <i class="user icon"></i><span class="label">Watchers: ${repo.watchers_count}</span>
                  <i class="star icon"></i><span class="label">Stars: ${repo.stargazers_count}</span>
                </div>
                </div>
                  <a href="${repo.html_url}" target="_blank" class="ui button">Repo Page</a>
              </div>
          `);
        });
      });
      $('#profile').html(`
        <div class="panel">
          <h3 class="panel-title">${user.name}</h3>
          <div class="panel-body">
            <div class="row">
                <img class="ui image" src="${user.avatar_url}">
                <br />
                <a target="_blank" class="button" href="${user.html_url}">View Profile</a>
              </div>
              <span class="ui label">Public Repos: ${user.public_repos}</span>
              <span class="ui label">Public Gists: ${user.public_gists}</span>
              <span class="ui label">Followers: ${user.followers}</span>
              <span class="ui label">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="item">Company: ${user.company}</li>
                <li class="item">Website/blog: ${user.blog}</li>
                <li class="item">Location: ${user.location}</li>
                <li class="item">Member Since: ${user.created_at}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <h3>Latest Repos</h3>
        <div id="repos"></div>
      `);
    });
  });
});