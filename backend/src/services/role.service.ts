import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { roles } from 'src/utils/roleSeed';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  seed() {
    return roles.map(async (item) => {
      const role = await this.roleRepository.findOneBy({ name: item.name });
      if (role) {
        return;
      }
      const newRole = this.roleRepository.create(item);
      return this.roleRepository.save(newRole);
    });
  }
}
//         //.exec()
//         .then(role=>{
//             if(role){
//                 return

//             }
//             return this.roleRepository.save(role)
//         })

//     }
// }
