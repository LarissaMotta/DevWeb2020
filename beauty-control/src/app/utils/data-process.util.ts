export default class DataProcessUtil {
  static convertToFormData(jsonObject: any): FormData {
    const formData: FormData = new FormData();

    if (!jsonObject) {
      return formData;
    }

    for (let key in jsonObject) {
      formData.append(key, jsonObject[key]);
    }

    return formData;
  }

  static convertToJsonObject(formData: FormData): any {
    const object = {};

    if (!formData) {
      return object;
    }

		formData.forEach((value: any, key: string) => {
			object[key] = value;
		});

		return object;
  }
}
