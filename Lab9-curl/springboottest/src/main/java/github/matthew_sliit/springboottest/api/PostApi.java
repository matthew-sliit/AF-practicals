package github.matthew_sliit.springboottest.api;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import github.matthew_sliit.springboottest.domain.Post;

@Service
public class PostApi {
	Map<UUID,Post> posts = new ConcurrentHashMap<UUID, Post>();
	@GetMapping
	public List<Post> getPostList() {
		return new ArrayList<Post>(posts.values());
	}
	public void setPost(Post post) {
		this.posts.put(post.getId(), post);
	}
	public void removePost(UUID id) {
		this.posts.remove(id);
	}
	public void updatePost(UUID id, Post post) {
		this.posts.replace(id, post);
	}
}
