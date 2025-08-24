extends KinematicBody

var velocity = 0 #manipulated by whatever shoots laser
var lifespan = 5 #bullet dies after <lifespan> seconds

func _process(delta):
	translation += self.transform.basis.z * delta * 40 + velocity
	lifespan -= delta
	if lifespan <= 0:
		queue_free()
