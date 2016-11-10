module.exports = (input, initialCircuit={}) => {
  return input
    .split("\n")
    .map(line => {
      const parts = line.split(" ")
      let operation = "ASSIGN"
      let operands = [parts[0]]

      if(parts[0] === "NOT") { operation = "NOT"; operands = [parts[1]]}
      if(parts[1] === "AND") {operation = "AND"; operands = [parts[0], parts[2]]}
      if(parts[1] === "OR") {operation = "OR"; operands = [parts[0], parts[2]]}
      if(parts[1] === "LSHIFT") {operation = "LSHIFT"; operands = [parts[0], parts[2]]}
      if(parts[1] === "RSHIFT") {operation = "RSHIFT"; operands = [parts[0], parts[2]]}

      return {operation, operands, destination: parts[parts.length - 1]}
    })
    .reduce(function resolveReduce(track, inst, uselessIndex, array){
      if (inst === false) return track;
      if (track.visited[inst.destination]) return track;
      if (!Array.isArray(inst.ancestor)) inst.ancestor = [];
      inst.ancestor.push(inst.destination);

      track.visited[inst.destination] = true;

      inst.operands.forEach(dep => resolveReduce(track, array.find(o => o.destination === dep) || false, uselessIndex, array));
      track.sorted.push(inst);
      return track
    }, {sorted: [], visited: {}})
    .sorted
    .reduce((circuit, inst) => {
      console.log(circuit)
      const wires = inst.operands.map(o => circuit[o] || parseInt(o, 10))
      if(inst.operation === "ASSIGN" && !circuit[inst.destination]) circuit[inst.destination] = wires[0];
      if(inst.operation === "NOT") circuit[inst.destination] = ~ wires[0];
      if(inst.operation === "AND") circuit[inst.destination] = wires[0] & wires[1];
      if(inst.operation === "OR") circuit[inst.destination] = wires[0] | wires[1];
      if(inst.operation === "LSHIFT") circuit[inst.destination] = wires[0] << wires[1];
      if(inst.operation === "RSHIFT") circuit[inst.destination] = wires[0] >> wires[1];
      circuit[inst.destination] &= 65535
      return circuit
    }, initialCircuit).a
}
