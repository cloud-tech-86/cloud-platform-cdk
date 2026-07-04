"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamingConstruct = void 0;
class NamingConstruct {
    config;
    constructor(config) {
        this.config = config;
    }
    generate(resourceType, suffix) {
        const parts = [
            this.config.vendor,
            this.config.application,
            this.config.environment,
            resourceType
        ];
        if (suffix) {
            parts.push(suffix);
        }
        return parts.join('-').toLowerCase();
    }
}
exports.NamingConstruct = NamingConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtaW5nLWNvbnN0cnVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5hbWluZy1jb25zdHJ1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBYSxlQUFlO0lBR1A7SUFEbkIsWUFDbUIsTUFBc0I7UUFBdEIsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7SUFDdEMsQ0FBQztJQUVHLFFBQVEsQ0FDYixZQUFvQixFQUNwQixNQUFlO1FBR2YsTUFBTSxLQUFLLEdBQUc7WUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07WUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVztZQUN2QixZQUFZO1NBQ2IsQ0FBQztRQUVGLElBQUksTUFBTSxFQUFFLENBQUM7WUFDWCxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JCLENBQUM7UUFFRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdkMsQ0FBQztDQUNGO0FBeEJELDBDQXdCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXRmb3JtQ29uZmlnIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9wbGF0Zm9ybS1jb25maWcnO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5hbWluZ0NvbnN0cnVjdCB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb25maWc6IFBsYXRmb3JtQ29uZmlnXHJcbiAgKSB7fVxyXG5cclxuICBwdWJsaWMgZ2VuZXJhdGUoXHJcbiAgICByZXNvdXJjZVR5cGU6IHN0cmluZyxcclxuICAgIHN1ZmZpeD86IHN0cmluZ1xyXG4gICk6IHN0cmluZyB7XHJcblxyXG4gICAgY29uc3QgcGFydHMgPSBbXHJcbiAgICAgIHRoaXMuY29uZmlnLnZlbmRvcixcclxuICAgICAgdGhpcy5jb25maWcuYXBwbGljYXRpb24sXHJcbiAgICAgIHRoaXMuY29uZmlnLmVudmlyb25tZW50LFxyXG4gICAgICByZXNvdXJjZVR5cGVcclxuICAgIF07XHJcblxyXG4gICAgaWYgKHN1ZmZpeCkge1xyXG4gICAgICBwYXJ0cy5wdXNoKHN1ZmZpeCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHBhcnRzLmpvaW4oJy0nKS50b0xvd2VyQ2FzZSgpO1xyXG4gIH1cclxufSJdfQ==