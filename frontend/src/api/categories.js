export const SERVICE_CATEGORIES = [
  { value: 'CNA', label: 'CNA', icon: '🩺' },
  { value: 'RN', label: 'RN', icon: '🩺' },
  { value: 'LPN', label: 'LPN', icon: '🩺' },
  { value: 'Certified Caregiver', label: 'Certified Caregiver', icon: '👴' },
  { value: 'Elderly Care Companion', label: 'Elderly Care Companion', icon: '💙' },
  { value: 'Companion Care', label: 'Companion Care', icon: '🤝' },
  { value: 'Housekeeper', label: 'Housekeeper', icon: '🧹' },
  { value: 'Private Chef', label: 'Private Chef', icon: '👨‍🍳' },
  { value: 'Babysitter', label: 'Babysitter', icon: '👶' },
  { value: 'Pet Sitter', label: 'Pet Sitter / Dog Walker', icon: '🐾' },
  { value: 'Driver', label: 'Personal Driver', icon: '🚗' },
  { value: 'Barber', label: 'Barber', icon: '💈' },
  { value: 'Hairstylist', label: 'Hairstylist', icon: '💇' },
  { value: 'Personal Assistant', label: 'Personal Assistant', icon: '📋' },
  { value: 'Private Nurse', label: 'Private Nurse', icon: '🏥' },
]

export function getCategoryIcon(category) {
  const found = SERVICE_CATEGORIES.find(c => c.value === category)
  return found ? found.icon : '🛠️'
}

export function getCategoryLabel(category) {
  const found = SERVICE_CATEGORIES.find(c => c.value === category)
  return found ? found.label : category
}