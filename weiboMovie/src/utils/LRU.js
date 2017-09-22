// {
//   key:;
//   value:;
//   newer:;
//   older:;
//   create:;
// }

// HEAD--------------TAIL
//   <.older   .newer>
//  <--- add direction --
//   A  B  C  <D>  E
// expiry === 0 时不清内存
class LRUCache {
  constructor(capacity, expiry) {
    this.size = 0;
    this.capacity = (typeof capacity === 'number') ? capacity : 10;
    this.keymap = Object.create(null);
    this.head = undefined; // 头结点（最旧的数据）
    this.tail = undefined; // 尾结点（最新的数据）
    // 默认5分钟后内存清除
    if (typeof expiry === 'number' && Math.min(10000, expiry) > 10) {
      const timer = Math.min(10000, expiry) - 1;
      setInterval(() => {
        if (this.size > 1) {
          if (Date.now() - this.head.create > expiry) {
            this.shift();
          }
        }
      }, timer);
    }
  }

  // // TODO 有坑不普适
  // change(key, value) {
  //   const node = this.get(key, true);
  //   if (node) {
  //     const nodeValue = JSON.parse(node.value);
  //     for (const k in value) {
  //       if (nodeValue[k]) {
  //         const obj = {};
  //         obj[k] = value[k];
  //         node.value = JSON.stringify(Object.assign(nodeValue, obj));
  //       }
  //     }
  //   }
  // }

  has(key) {
    const node = this.keymap[key];
    // 若结点不存在
    if (!node) return false;
    return true;
  }

  get(key, returnNode) {
    const node = this.keymap[key];
    // 若结点不存在
    if (!node) return node;
    node.create = Date.now();
    // 若是最新的结点，直接就返回, 链表不改变顺序
    if (node === this.tail) {
      return returnNode ? node : node.value;
    }

    // 若不是最新的结点，提到最前
    if (node.newer) {
      node.newer.older = node.older;
      if (node === this.head) {
        this.head = node.newer;
      }
    }
    if (node.older) {
      node.older.newer = node.newer;
    }

    node.newer = undefined;
    node.older = this.tail;
    if (this.tail) {
      this.tail.newer = node;
    }
    this.tail = node;
    return returnNode ? node : node.value;
  }

  put(key, value) {
    let node = this.get(key, true);
    // 若添加进的是新结点
    if (!node) {
      node = {
        key: key
      };
      if (this.tail) {
        this.tail.newer = node;
        node.older = this.tail;
      } else {
        this.head = node;
      }
      this.tail = node;
      this.keymap[key] = node;
      this.size++;
    }
    // 新结点的话 value 赋值，旧结点的话 value 更新；
    node.create = Date.now();
    node.value = value;
    if (this.size > this.capacity) {
      this.shift();
    }
  }

  shift() {
    const node = this.head;
    if (node) {
      this.head = node.newer;
      if (this.head) {
        this.head.older = undefined;
      }
      delete this.keymap[node.key];
      this.size--;
    }
  }
}
module.exports = LRUCache;
// var cache = new LRUCache(2);
// cache.put(1,3);
// cache.put(2,3);
// cache.put(1,4);
// cache.get(1);
