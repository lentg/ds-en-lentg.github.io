# exec = require('child_process').exec
# exec 'node ./test.js', (err, stdout, stderr) ->
#   console.log "stdout: #{stdout}"
#   console.log "stderr: #{stderr}"
#   console.log "exec error: #{err}" 


# var arr = [{name:'Jack', delay: 200}, 
#            {name:'Mike', delay: 100}, 
#            {name:'Freewind', delay: 300}];
 
# async.forEach(arr, function(item, callback) { 
#     log(’1.1 enter: ‘ + item.name); 
#     setTimeout(function(){ 
#         log(’1.1 handle: ‘ + item.name); 
#         callback(); 
#     }, item.delay); 
# }, function(err) { 
#     log(’1.1 err: ‘ + err); 
# });

# arr = [
#   {name: 'Jack', delay: 200}
#   {name: 'Mike', delay: 100}
#   {name: 'Freewind', delay: 300}
# ]

# add = (x) ->
#   x = x|0
#   (x+1)|0
# console.log add()


# if !nums.par
#   (_.each S.ls, (obj) -> if nums[obj.category] is undefined then nums[obj.category]=1 else nums[obj.category]++) 


# lights = [
#   {key: 'par', value: 'LED PAR'}
#   {key: 'par', value: 'LED PAR 2'}
#   {key: 'moving', value: 'Moving Heads'}
#   {key: 'moving', value: 'Moving Heads 2'}
#   {key: 'other', value: 'Other'}
#   {key: 'washer', value: 'Wall Washer'}
# ]
# console.log lights.length
# categorys = [
#   { k: 'par', value: 'LED PAR' }
#   { k: 'moving', value: 'Moving Heads' }
#   { k: 'Washer', value: 'LED Wall Washer' }
#   { k: 'city', value: 'City Color' }
#   { k: 'other', value: 'Other' }
# ]
# group = {}
# for obj in lights
#   if group[obj.key]
#     group[obj.key] += 1
#   else
#     group[obj.key] = 1


# console.log group
  




# S.num = nums[S.keys[index]] || 0 if S.keys[index]


# a = [1,5,3,6,9]
# b = for i in a if i == 5
# console.log b



# foods = ['broccoli', 'spinach', 'chocolate']
# console.log  food for food in foods when food is 'chocolate'


# categorys = [
#   {k: 'par', v: 'LED PAR'}
#   {k: 'city', v: 'City Color'}
#   {k: 'moving', v: 'Moving Heads'}
#   {k: 'washer', v: 'LED Wall Washer'}
#   {k: 'other', v: 'Other'}
# ]
# console.log category.v for category in categorys when category.k is 'par'


a = [1,2,3,6,9,8,7,11,25,13,59,60,66,33,88,99,55]
# random = (min, max) ->
#   if !max
#     max = min
#     min = 0
#   min + Math.floor(Math.random() * (max - min + 1))
  
# shuffle = (items, n) ->
#   index = -1
#   length = items.length
#   result = Array(length)

#   for i in [0...length]
#     rand = random 0, i
#     result[i] = result[rand] if i != rand
#     result[rand] = items[i]
#   if n
#     result.slice 0, n
#   else
#     result

# console.time '100-elements'
# # for i in [0...5]
# console.log (shuffle a).slice 0, 3
# console.timeEnd('100-elements');



# console.time('200-elements');
# # for i in [0...5]
# console.log (a.sort -> 0.5 - Math.random()).slice 0, 3
# console.timeEnd('200-elements');


# console.log a.sort -> 0.5 - Math.random()
console.log new Date().getFullYear()
d = new Date()
console.log new Date().toDateString()
console.log "#{d.getFullYear()}-#{d.getMonth()}-#{d.getDate()}"