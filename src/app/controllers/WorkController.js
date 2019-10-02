import * as Yup from 'yup';
import Work from '../models/work';

class WorkController {
  async store(req, res) {
    const schema = Yup.object().shape({
      turma_id: Yup.number().required(),
      descripition: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { turma_id, descripition } = req.body;

    const work = await Work.create({
      user_id: req.user_id,
      turma_id,
      descripition,
    });

    return res.json(work);
  }
}

export default new WorkController();
