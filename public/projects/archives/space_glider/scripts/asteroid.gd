extends RigidBody
var velocity = Vector3()

func start_val():
    return randf() - 0.5

func _ready():
    randomize()
	#Each asteroid has a randomized linear velocity, and randomized rotational velocity
    linear_velocity.x = start_val() / 5
    linear_velocity.y = start_val() / 5
    linear_velocity.z = start_val() / 5
    add_torque(Vector3(start_val(),start_val(),start_val()))