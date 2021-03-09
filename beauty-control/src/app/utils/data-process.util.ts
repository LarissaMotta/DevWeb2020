export default class DataProcessUtil {
  static convertToFormData(jsonObject: any, properties: string[] = null): FormData {
    const formData: FormData = new FormData();

    if (!jsonObject) {
      return formData;
    }

    properties = properties ? properties : Object.keys(jsonObject);

		for (let i = 0; i < properties.length; i++) {
			let key = properties[i];
			formData.append(key, jsonObject[key]);
		}

    return formData;
  }

  static convertToJsonObject(formData: FormData, properties: string[] = null): any {
    const object = {};

    if (!formData) {
      return object;
    }

		if (properties) {
			properties.forEach((key: any) => object[key] = formData.get(key));
		} else {
			formData.forEach((value: any, key: string) => object[key] = value);
		}

		return object;
  }
}
