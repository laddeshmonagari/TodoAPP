using AutoMapper;
using TodoApp.Models;
using TodoApp.Models.DTO;

namespace TodoApp.Services
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<TaskDTO, TodoTask>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.ModifiedBy, opt => opt.Ignore())
                .ForMember(dest => dest.ModifiedOn, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedOn, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.IsCompleted, opt => opt.MapFrom(src => false));

            CreateMap<TodoTask, TaskResponseDTO>();

            CreateMap<UpdateTaskDTO, TodoTask>()
                .ForMember(dest => dest.ID, opt => opt.Ignore())
                .ForMember(dest => dest.CreatedOn, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.Ignore())
                .ForMember(dest => dest.ModifiedOn, opt => opt.Ignore())
                .ForMember(dest => dest.ModifiedBy, opt => opt.Ignore());
        }
    }
}
