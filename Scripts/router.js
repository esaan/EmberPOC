
GithubApp.Router.map(
   function () {
     this.resource("user", { path: "/users/:login" }, function () {
       this.resource("repositories", { path: "/repositories" });
       this.resource("repository", { path: "/repositories/:reponame" }, function () {
         this.resource("issues");
         this.resource("forks");
         this.resource("commits");
         this.route("newissue");
       });
     });

   });

GithubApp.UserRoute = Ember.Route.extend({
  model: function (params) {
    return Ember.$.getJSON("https://api.github.com/users/" + params.login);
  }
});

GithubApp.UserIndexRoute = Ember.Route.extend({
  model: function () {
    return this.modelFor("user");
  }
});

GithubApp.RepositoriesRoute = Ember.Route.extend({
  model: function () {
    var user = this.modelFor("user");
    return Ember.$.getJSON(user.repos_url);
  }
});

GithubApp.RepositoryRoute = Ember.Route.extend({
  model: function (params) {
    var user = this.modelFor("user");
    var url = "https://api.github.com/repos/" + user.login + "/" + params.reponame;
    return Ember.$.getJSON(url);
  }
});

GithubApp.IssuesRoute = Ember.Route.extend({
  model: function (params) {
    var repo = this.modelFor("repository");
    var url = repo.issues_url.replace("{/number}", "");
    return Ember.$.getJSON(url);
  }
});
GithubApp.ForksRoute = Ember.Route.extend({
  model: function (params) {
    var repo = this.modelFor("repository");
    var url = repo.forks_url;
    return Ember.$.getJSON(url);
  }
});
GithubApp.CommitsRoute = Ember.Route.extend({
  model: function (params) {
    var repo = this.modelFor("repository");
    var url = repo.commits_url.replace("{/sha}", "");
    return Ember.$.getJSON(url);
  }
});