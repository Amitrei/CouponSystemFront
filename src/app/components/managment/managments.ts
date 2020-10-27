export class Managments {
  constructor() {}

  sortTable(content: any[], sortProperty?: string): any[] {
    // if content loaded sort can be started.
    if (content) {
      let sortedArray: any[] = content.sort((n1, n2) => {
        if (n1[sortProperty] > n2[sortProperty]) {
          return 1;
        }

        if (n1[sortProperty] < n2[sortProperty]) {
          return -1;
        }

        return 0;
      });

      return sortedArray;
    }
    return content;
  }

  filter(content: any[], filterProperty: string, filterContent: string): any[] {
    if (content) {
      let filtered = content.filter((object) => object[filterProperty] === filterContent);
      return filtered;
    }
  }
}
