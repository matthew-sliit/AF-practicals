package github.matthew_sliit.springboottest.domain;

import java.util.UUID;

import org.springframework.web.bind.annotation.RequestBody;

import github.matthew_sliit.springboottest.dto.PostDto;

public class Post {
	String name, description;
	UUID id;
	public Post(@RequestBody PostDto postdto) {
		this.setName(postdto.getName());
		this.setDescription(postdto.getDescription());
		UUID id = UUID.randomUUID();
		this.setId(id);
	}
	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
}
