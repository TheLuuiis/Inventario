const TipoEquipo = require('../models/tipoEquipoModel');

// Listamos todos los tipos de equipo
exports.getAllTiposEquipo = async (req, res) => {
    try {
        const tiposEquipo = await TipoEquipo.find();
        res.json(tiposEquipo);
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

// Obtenemos un tipo de un equipo por su ID
exports.getTipoEquipoById = async (req, res) => {
    try {
        const tipoEquipo = await TipoEquipo.findById(req.params.id);
        if(!tipoEquipo) {
            return res.status(404).json({message: 'El tipo de equipo no ha sido encontrado'});
        }
        res.json(tipoEquipo);
    } catch (error) {
        res.status(500).json({error: error.message4})
    };
};

// Creamos un nuevo tipo de equipo
exports.createTipoEquipo = async (req, res) => {
    try {
        const {nombre, estado} = req.body;
        const tipoEquipo = new TipoEquipo({nombre, estado});
        await tipoEquipo.save();
        res.status(201).json({message: 'El tipo de equipo ha sido creado exitosamente'});
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

// Editamos un tipo de equipo ya existente
exports.updateTipoEquipo = async (req, res) => {
    try {
        const {nombre, estado } = req.body;
        const tipoEquipoId = req.params.id;
        const tipoEquipo = await TipoEquipo.findByIdAndUpdate(tipoEquipoId, {nombre, estado}, {new: true});
        if(!tipoEquipo) {
            return res.json(404).json({message: 'El tipo de equipo no ha sido encontrado'})
        }
        res.json({message: 'El tipo de quipo ha sido actualizado exitosamente', tipoEquipo});
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};

// Eliminamos un tipo de equipo ya existente
exports.deleteTipoEquipo = async (req, res) => {
    try {
        const tipoEquipoId = req.params.id;
        const tipoEquipo = await TipoEquipo.findByIdAndDelete(tipoEquipoId);
        if(!tipoEquipo) {
            return res.status(404).json({message: 'El tipo de equipo no ha sido encotrado'});
        }
        res.json({message: 'El tipo de equipo ha sido eliminado exitosamente', tipoEquipo});
    } catch (error) {
        res.status(500).json({error: error.message});
    };
};