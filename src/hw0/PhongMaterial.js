import {ShaderMaterial, Vector3} from 'three'
const phongVertexShader = `
	varying vec2 vUv;
	varying vec3 vNormal;
	varying vec3 vFragPos;
	void main(void) {
	vUv = uv;
	vNormal = normal;
	vFragPos = position;

	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}
`
const phongFragmentShader = `
#ifdef GL_ES
precision mediump float;
#endif
uniform sampler2D map;
uniform vec3 uLightPos;
uniform vec3 uCameraPos;
// uniform float uLightIntensity;

varying highp vec2 vUv;
varying highp vec3 vFragPos;
varying highp vec3 vNormal;

void main(void) {
  vec3 color = pow(texture2D(map, vUv).rgb, vec3(2.2));
  
  vec3 ambient = 0.05 * color;

  vec3 lightDir = normalize(uLightPos - vFragPos);
  vec3 normal = normalize(vNormal);
  float diff = max(dot(lightDir, normal), 0.0);
  float light_atten_coff = 10.0 / length(uLightPos - vFragPos);
  vec3 diffuse =  diff * light_atten_coff * color;

  vec3 viewDir = normalize(uCameraPos - vFragPos);
  float spec = 0.0;
  vec3 reflectDir = reflect(-lightDir, normal);
  spec = pow (max(dot(viewDir, reflectDir), 0.0), 35.0);
  vec3 specular = vec3(1.0) * light_atten_coff * spec;  
  
  gl_FragColor = vec4(pow((ambient + diffuse + specular), vec3(1.0/2.2)), 1.0);

}
`
export class PhongMaterial extends ShaderMaterial {
	constructor({map}) {
		const uniforms = {
			map: {value: map},
			uLightPos: {value: new Vector3(0, 0, 10)},
			uCameraPos: {value: new Vector3(0, 0, 0)}
		}
		super({
			uniforms,
			vertexShader: phongVertexShader,
			fragmentShader: phongFragmentShader
		})
		Object.defineProperties(this, {
			map: {
				set: (v) => {
					this.setUniformValue('map', v);
				},
				get: () => {
					return this.uniforms['map'].value;
				}
			},
		});
	}
	setUniformValue(parameter, value) {
		if (this.uniforms[parameter]) {
			this.uniforms[parameter].value = value;
		}
	}
}
