export class TableFilters {
  skipHeaders(property: string) {
    switch (property) {
      case 'hibernateLazyInitializer': {
        return null;
      }
      case 'id': {
        return null;
      }

      case 'password': {
        return null;
      }

      case 'image': {
        return null;
      }

      case 'company': {
        return null;
      }

      case 'idOfCompany': {
        return null;
      }

      case 'coupons': {
        return null;
      }

      case 'firstName': {
        return 'First name';
      }

      case 'lastName': {
        return 'Last name';
      }

      case 'companyName': {
        return 'Company';
      }

      case 'start_date': {
        return 'Start-Date';
      }

      case 'end_date': {
        return 'End-Date';
      }
      default: {
        let cappedProperty = property.charAt(0).toUpperCase() + property.substr(1);
        return cappedProperty;
      }
    }
  }

  skipHeadersAsCustomer(property: string) {
    switch (property) {
      case 'id': {
        return null;
      }
      case 'company': {
        return null;
      }
      case 'hibernateLazyInitializer': {
        return null;
      }
      case 'image': {
        return null;
      }
      case 'password': {
        return null;
      }

      case 'idOfCompany': {
        return null;
      }

      case 'coupons': {
        return null;
      }

      case 'companyName': {
        return 'Company';
      }

      case 'start_date': {
        return null;
      }

      case 'end_date': {
        return null;
      }
      case 'amount': {
        return null;
      }

      default: {
        let cappedProperty = property.charAt(0).toUpperCase() + property.substr(1);
        return cappedProperty;
      }
    }
  }

  skipProperty(property: string, isCustomer: boolean): boolean {
    if (!isCustomer) {
      switch (property) {
        case 'password': {
          return true;
        }

        case 'hibernateLazyInitializer': {
          return true;
        }

        case 'image': {
          return true;
        }
        case 'id': {
          return true;
        }

        case 'idOfCompany': {
          return true;
        }

        case 'coupons': {
          return true;
        }

        default: {
          return false;
        }
      }
    } else {
      return this.skipPropertyAsCustomer(property);
    }
  }

  skipPropertyAsCustomer(property: string): boolean {
    switch (property) {
      case 'password': {
        return true;
      }

      case 'hibernateLazyInitializer': {
        return true;
      }

      case 'id': {
        return true;
      }

      case 'image': {
        return true;
      }
      case 'idOfCompany': {
        return true;
      }

      case 'coupons': {
        return true;
      }

      case 'start_date': {
        return true;
      }

      case 'end_date': {
        return true;
      }

      case 'amount': {
        return true;
      }

      default: {
        return false;
      }
    }
  }
}
