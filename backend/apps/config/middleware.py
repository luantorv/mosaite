from django.utils.deprecation import MiddlewareMixin
from .models import Config


class ConfigMiddleware(MiddlewareMixin):
    """
    Middleware que hace disponible la configuración del sistema
    en todas las requests como request.config.
    
    También proporciona acceso individual a cada campo:
    - request.company_name
    - request.system_mode
    - request.date_format
    - request.currency
    """
    
    def process_request(self, request):
        """
        Agrega la configuración al objeto request.
        """
        config = Config.get_config()
        
        # Agrega el objeto config completo
        request.config = config
        
        # Agrega cada campo individualmente para fácil acceso
        if config:
            request.company_name = config.company_name
            request.system_mode = config.system_mode
            request.date_format = config.date_format
            request.currency = config.currency
        else:
            request.company_name = None
            request.system_mode = None
            request.date_format = None
            request.currency = None
        
        return None