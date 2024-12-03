export const getBackgroundClass = (category, subcategory) => {
    switch (category) {
      case 'Science':
        switch (subcategory) {
          case 'Physics':
            return 'bg-gradient-to-r from-blue-200 to-indigo-200';
          case 'Maths':
            return 'bg-gradient-to-r from-green-200 to-teal-200';
          case 'Natural Science':
            return 'bg-gradient-to-r from-yellow-200 to-green-200';
          default:
            return 'bg-gradient-to-r from-blue-100 to-green-100';
        }
      case 'Languages':
        switch (subcategory) {
          case 'Arabic':
            return 'bg-gradient-to-r from-red-200 to-yellow-200';
          case 'French':
            return 'bg-gradient-to-r from-blue-200 to-red-200';
          case 'English':
            return 'bg-gradient-to-r from-purple-200 to-pink-200';
          default:
            return 'bg-gradient-to-r from-pink-100 to-purple-100';
        }
      case 'History/Geography':
        return 'bg-gradient-to-r from-yellow-100 to-orange-100';
      default:
        return 'bg-gradient-to-r from-gray-100 to-gray-200';
    }
  };