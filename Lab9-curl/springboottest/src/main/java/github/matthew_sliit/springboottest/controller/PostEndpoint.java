package github.matthew_sliit.springboottest.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import github.matthew_sliit.springboottest.api.PostApi;
import github.matthew_sliit.springboottest.domain.Post;
import github.matthew_sliit.springboottest.dto.PostDto;
import io.undertow.server.HttpServerExchange;

@RestController
@RequestMapping("/posts")
//@CrossOrigin("http://localhost:8080")//otherwise CORS policy blocks the request
public class PostEndpoint {
	PostApi postapi = new PostApi();
	@Autowired
	public PostEndpoint(PostApi api) {
		this.postapi = api;
	}
	@GetMapping
	List<Post> getList(){
	    return postapi.getPostList();
	}
	@GetMapping("/{id}")
	Post getPost(@PathVariable UUID id) {
		for(Post post : postapi.getPostList()) {
			if(post.getId().equals(id))
				return post;
		}
		return null;
	}
	//@RequestBody doesn't support 'application/x-www-form-urlencoded'
	//for 'application/x-www-form-urlencoded' -> void addPost(PostDto postdto)
	@PostMapping
	@ResponseStatus(HttpStatus.NO_CONTENT)//204
	void addPost(@RequestBody PostDto postdto) {
		Post post = new Post(postdto);
		postapi.setPost(post);
	}
	@CrossOrigin(origins = "http://localhost:8080/posts/")
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)//204
	String removePost(@PathVariable UUID id) {
		postapi.removePost(id);
		return "success";
	}
	//hostname:port/posts/{id}
	//@RequestBody doesn't support 'application/x-www-form-urlencoded'
	//void updatePost(@PathVariable UUID id, @RequestBody PostDto postdto) {}
	@CrossOrigin(origins = "http://localhost:8080/posts/")
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)//204
	Post updatePost(@PathVariable UUID id,PostDto postdto) {
		Post post = new Post(postdto);
		postapi.updatePost(id, post);
		return this.getPost(id);
	}
	
}
