extends KinematicBody
# translational velocity
var velocity = Vector3()
# rotational velocity
var rot_velocity = Vector3()
var attack_cooldown = 0
var intensity = 0
var THRUST_POWER = 0.03
var SIDE_THRUST_POWER = 0.003
var laser = load("res://scenes/laser.tscn")
func shoot():
	for spawnPoint in get_tree().get_nodes_in_group("bulletSpawn"):
		var node = laser.instance()
		node.translation = spawnPoint.get_global_transform().origin
		node.rotation = self.rotation
		node.velocity = velocity
		get_parent().add_child(node)
func _process(delta):
	print(self.rotation)
	# move_frame is a special variable that handles the camera's z position.
	# It moves back based on the amount of THRUST_POWER
	var forward_vector = self.transform.basis.z
	var move_frame = 0
	if intensity > 0:
		intensity -= 1
	if Input.is_action_pressed("ui_select"):
		intensity = 100

		if Input.is_action_pressed("boost"):
			velocity += forward_vector*THRUST_POWER * 5
		else:
			velocity += forward_vector*THRUST_POWER
		move_frame = THRUST_POWER * 10
	$Thruster.get_surface_material(0).set_shader_param("intensity", intensity)
	if Input.is_action_pressed("ui_right"):
		rot_velocity.y -= SIDE_THRUST_POWER
	if Input.is_action_pressed("ui_left"):
		rot_velocity.y += SIDE_THRUST_POWER
	if Input.is_action_pressed("ui_up"):
		rot_velocity.x += SIDE_THRUST_POWER
	if Input.is_action_pressed("ui_down"):
		rot_velocity.x -= SIDE_THRUST_POWER
	if Input.is_action_pressed("roll_left"):
		rot_velocity.z -= SIDE_THRUST_POWER
	if Input.is_action_pressed("roll_right"):
		rot_velocity.z += SIDE_THRUST_POWER

	if Input.is_action_pressed("attack") and attack_cooldown <= 0:
		attack_cooldown = 0.1
		shoot()
	if attack_cooldown > 0:
		attack_cooldown -= delta

	# Update the camera's position based on the players velocity and rot_velocity
	$Camera.translation.z = lerp($Camera.translation.z,move_frame - 3,0.1)
	$Camera.rotation.y = lerp($Camera.rotation.y,rot_velocity.y - PI,0.1)
	$Camera.rotation.x = lerp($Camera.rotation.x,rot_velocity.x,0.1)
	
	# Move the player based on their velocity and rot_velocity, rotate on corresponding bases
	translation += velocity
	
	rotate(self.transform.basis.x.normalized(), rot_velocity.x) #throws error. <>.normalized() to resolve?
	rotate(self.transform.basis.y.normalized(), rot_velocity.y)
	rotate(self.transform.basis.z.normalized(), rot_velocity.z)
	
	# Apply friction, increase friction if player is holding shift (aim action)
	velocity *= 0.95
	if Input.is_action_pressed("aim"):
		rot_velocity *= 0.5
	else:
		rot_velocity *= 0.95
