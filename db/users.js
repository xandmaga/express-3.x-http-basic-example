var records = [
    { id: 1, username: 'xandmaga@outlook.com', password: 'xandmaga123', displayName: 'Alexandre', emails: [ { value: 'xandmaga@outlook.com' } ] }
  , { id: 2, username: 'rafinha_salomao14@hotmail', password: 'raphael123', displayName: 'Raphael', emails: [ { value: 'rafinha_salomao14@hotmail' } ] }
];

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
