extends Spatial
func _ready():
	var sphere = load("res://scenes/sphere.tscn")
	var cube = load("res://scenes/cube.tscn")
	for i in range(0,100):
		var node
		if randf() > 0.5:
			node = sphere.instance()
		else:
			node = cube.instance()
		var scale = randf() * 2 + 0.5
		node.scale = Vector3(scale,scale,scale)
		add_child(node)
