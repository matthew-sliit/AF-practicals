package github.matthew_sliit.springboottest.dto;

public class PostDto {
	String name, description;
	
	public PostDto() {
		
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
