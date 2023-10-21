import NodeCache from "node-cache";

export class Caching {
    static cache = new NodeCache();

    static getCache() {
        return this.cache;
    }

    static getTtl(key: NodeCache.Key) {
        const ttl = this.cache.getTtl(key);
        if(ttl === undefined) {
            return 0;
        }
        return ttl;
    }
}