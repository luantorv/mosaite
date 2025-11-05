from .models import Config


class SystemModeMiddleware:
    """
    Middleware para agregar el modo del sistema al request
    """
    def __init__(self, get_response):
        self.get_response = get_response
    
    def __call__(self, request):
        try:
            config = Config.objects.first()
            request.system_mode = config.system_mode if config else False
        except:
            request.system_mode = False
        
        response = self.get_response(request)
        return response