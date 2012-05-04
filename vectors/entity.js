Object.prototype.reduce = function(f, start, thisPtr) {
	current = start || 0;
	for(k in this) {
		if(this.hasOwnProperty(k)) {
			current = f.call(thisPtr, current, this[k], k, this)
		}
	}
	return current;
}

var Entity = function(position, velocity) {
	this.position = position || Vector.zero();
	this.velocity = velocity || Vector.zero();
	this.forces = {};
}

Entity.prototype.getMass = function() { return 1; }
Entity.prototype.getAcceleration = function() {
	return this.forces.reduce(function sumVectors(total, current) {
		if(current instanceof Vector)
			return total.plusEquals(current);
		else if(current instanceof Array || current instanceof Object)
			return current.reduce(sumVectors, total);
		else
			return total;
	}, Vector.zero()).overEquals(this.getMass());
}
Entity.prototype.update = function(dt) {
	this.velocity.plusEquals(this.getAcceleration().times(dt))
	this.position.plusEquals(this.velocity.times(dt))
	return this;
}