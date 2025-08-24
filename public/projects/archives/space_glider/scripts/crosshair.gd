extends Sprite
onready var camera = get_node("/root/World/Player/Camera")
onready var bulletSpawn = get_node("/root/World/Player/bulletSpawn")
func _process(delta):
	self.position.x = get_viewport().size.x/2
	var bullet_transform = bulletSpawn.get_global_transform()
	var bullet_origin = bullet_transform.origin
	var bullet_basis = bullet_transform.basis.z * 20
	self.position.y = camera.unproject_position(bullet_origin + bullet_basis).y